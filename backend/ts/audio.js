"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
function convertBufferTo1Channel(buffer) {
    var convertedBuffer = Buffer.alloc(buffer.length / 2);
    for (var i = 0; i < convertedBuffer.length / 2; i++) {
        var uint16 = buffer.readUInt16LE(i * 4);
        convertedBuffer.writeUInt16LE(uint16, i * 2);
    }
    return convertedBuffer;
}
exports.convertBufferTo1Channel = convertBufferTo1Channel;
var ConvertTo1ChannelStream = /** @class */ (function (_super) {
    __extends(ConvertTo1ChannelStream, _super);
    function ConvertTo1ChannelStream(source, options) {
        return _super.call(this, options) || this;
    }
    ConvertTo1ChannelStream.prototype._transform = function (data, encoding, next) {
        next(null, convertBufferTo1Channel(data));
    };
    return ConvertTo1ChannelStream;
}(stream_1.Transform));
exports.ConvertTo1ChannelStream = ConvertTo1ChannelStream;
