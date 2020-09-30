module.exports = {
  name: 'fhapp',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/fhapp',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
