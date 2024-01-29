/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Upload
// ====================================================

export interface Upload_upload {
  __typename: "FileExt";
  name: string;
  url: string;
  extension: string;
}

export interface Upload {
  upload: Upload_upload[];
}

export interface UploadVariables {
  data: any[];
}
