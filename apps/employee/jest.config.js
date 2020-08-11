module.exports = {
  name: 'employee',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/employee',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
