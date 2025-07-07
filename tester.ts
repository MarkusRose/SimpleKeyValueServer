
export class EncodingUtilities {
    public static base64EncodeUnicode(stringToEncode: string): string {
        const escaped = encodeURIComponent(stringToEncode);
        const escapedAndReplaced = escaped.replace(/%([0-9A-F]{2})/g, (match, p1: string) =>
            String.fromCharCode(parseInt(p1, 16))
        );
        return btoa(escapedAndReplaced);
    }

    public static base64DecodeUnicode(stringToDecode: string): string {
        const radixParameter = 16;
        const sliceParameter = -2;
        const decodedString = atob(stringToDecode);
        const escaped = decodedString
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(radixParameter)).slice(sliceParameter))
            .join('');
        return decodeURIComponent(escaped);
    }

    public static async base64EncodeBlob(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result.split(',')[1]); // Removes the data URL prefix
                } else {
                    reject('Could not read Blob');
                }
            };
            reader.onerror = (error) => reject(error);
        });
    }

    public static base64DecodeBlob(base64: string, mimeType: string): Blob {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    }
}

const myObject = {
    to: 'home',
    from: 'wörk 地にいすん',
    duration: Date.now(),
    enroute: true,
    counts: [1, 2,3, 4],
    level: { bosses: 5, name: ["charlie"]}
}

const instring = JSON.stringify(myObject);
const outstring = EncodingUtilities.base64EncodeUnicode(instring);
console.log(outstring);
const revertstring = Buffer.from(outstring, 'base64').toString();
console.log(JSON.parse(revertstring));
const sendstring = Buffer.from(revertstring).toString('base64')
console.log(JSON.parse(EncodingUtilities.base64DecodeUnicode(sendstring)));
