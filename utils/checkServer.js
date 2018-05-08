// https://github.com/iliakan/detect-node
export default () => Object.prototype.toString.call(global.process) === '[object process]';
