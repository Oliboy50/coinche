Files in this directory are used by both `client` and `server` applications.

This directory is located in `client/src` because:
- the `shared` directory must be packed in the `client` application bundle
- the `client` build process (from create-react-app) cannot reach files outside of `client/src`
