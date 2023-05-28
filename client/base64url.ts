/*
* See:
* https://deno.land/std@0.185.0/encoding/base64url.ts
* */

import {decode, encode,} from "https://deno.land/std@0.185.0/encoding/base64url.ts";

const base64url = {

    decodeToString: (str: string) => {

        // https://deno.land/std@0.185.0/encoding/base64url.ts
        const uint8Array: Uint8Array = decode(str);

        // A decoder takes a stream of bytes as input and emits a stream of code points.
        // https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
        let utf8decoder = new TextDecoder(); // default 'utf-8' or 'utf8'
        return utf8decoder.decode(uint8Array);
    },

    encodeString: (str: string) => {
        const binary = new TextEncoder().encode(str);
        const encoded = encode(binary);
        return encoded;
    }

}

export default base64url;