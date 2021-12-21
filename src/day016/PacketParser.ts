import { hexToBin } from "./utils";

export class Packet {
    version: number;
    type: number;
    subPackets: Packet[] = [];
    value = 0;
    constructor(version: number, type: number) {
        this.version = version;
        this.type = type;
    }
}

const calculatePacketValue = (packet: Packet): number => {
    switch(packet.type) {
        case 0: // sum
          return packet.subPackets.reduce((a, b) => a + b.value, 0);
        case 1: // product
          return packet.subPackets.reduce((a, b) => a * b.value, 1);
        case 2: // min
          return Math.min(...packet.subPackets.map((p) => p.value));
        case 3: // max
          return Math.max(...packet.subPackets.map((p) => p.value));
        case 5: //greater than
          return packet.subPackets[0].value > packet.subPackets[1].value ? 1 : 0;
        case 6: //lower than
          return  packet.subPackets[0].value < packet.subPackets[1].value ? 1 : 0;
        case 7: //equal to
          return packet.subPackets[0].value === packet.subPackets[1].value ? 1 : 0;
        default:
          break;
    }
    return 0;
}

export class PacketParser {
    binaryStream: string[] = [];
    sumVersions = 0;
    packetValue = 0;
    constructor(input: string) {
        this.binaryStream = hexToBin(input);
        this.parsePackets();
    }

    addUpVersionsForAllPackets = (packets: Packet[]): number => {
        return packets
        .map((p) => p.version + this.addUpVersionsForAllPackets(p.subPackets))
        .reduce((a, b) => a + b, 0);
    }

    parseLiterals = (binary: string[]) => {
        let decoded = '';
        while(true) {
            const chunk = binary.splice(0, 5).join('');
            decoded += chunk.substring(1);
            // when we reahced 0, we can now exit.
            if (chunk[0] === '0') {
                break;
            }
        }
    
        return decoded;
    }

    parsePackets = () => {
        const packets = this.parsePacket(this.binaryStream);
        this.sumVersions = this.addUpVersionsForAllPackets(packets)
        this.packetValue = packets[0].value;
    }

    get versionSum () {
        return this.sumVersions;
    }

    get outterPacketValue () {
        return this.packetValue;
    }

    parsePacket = (binaryStream: string[], numSubpackets = -1) => {
        const packets: Packet[] = [];
        let numParsedSubpackets = 0;
        while(binaryStream.length > 0 &&
            (numSubpackets < 0 || numParsedSubpackets < numSubpackets)
          ) {
            // we got no more significant bits. all zeros, lets bail now.
            if (binaryStream.filter(b => b === '1') === undefined) {
                break;
            }
            const version = parseInt(binaryStream.splice(0, 3).join(''), 2);
            const type = parseInt(binaryStream.splice(0, 3).join(''), 2);
            const packet = new Packet(version, type);
            
            numParsedSubpackets += 1;
            // this is a type 4, which means it is a literal package
            if (type === 4) {
                const decoded = this.parseLiterals(binaryStream);
                packet.value = parseInt(decoded, 2);
            } else {
                const packetId = binaryStream.shift();
                if (packetId === '1') {
                    // next 11 bits are the subpacket size
                    const subpacketCount = parseInt(binaryStream.splice(0, 11).join(''), 2);
                    packet.subPackets = this.parsePacket(binaryStream, subpacketCount);
                } else if (packetId === '0') {
                    // next 15 bits are the subpacket size
                    const subpacketSize = parseInt(binaryStream.splice(0, 15).join(''), 2);
                    packet.subPackets = this.parsePacket(binaryStream.splice(0, subpacketSize));
                }

                packet.value = calculatePacketValue(packet);
            }
            packets.push(packet);
        }
        
        return packets;
    }
}