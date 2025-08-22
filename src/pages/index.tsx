import React, {useEffect} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { LAST_VERSION } from '@site/config/versions';

export default function IndexRedirect() {
  const to = useBaseUrl(`${LAST_VERSION}/introduction`);
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}