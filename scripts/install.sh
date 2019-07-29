#!/bin/bash

if lerna -h ; then # TRY
  lerna bootstrap
else # CATCH
  echo -e "\x1b[91mlerna command was not found, you might have forgotten to install it globally try to run \"yarn global add lerna\" and try again\x1b[0m"
fi

if yarn ; then # TRY
  cd packages/api
  yarn tsc
else # CATCH
  echo -e "\x1b[91myarn command was not found, you might have forgotten to install it globally try to run \"curl -o- -L https://yarnpkg.com/install.sh | bash\" and try again\x1b[0m"
fi
