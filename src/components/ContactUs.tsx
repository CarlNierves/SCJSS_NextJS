import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
import React from 'react';
import { withRouter } from 'next/router';
import { sitecoreApiHost, sitecoreApiKey } from '../temp/config';

const ContactUs = ({ fields, router }: any) => (
    <Form
      form={fields}
      sitecoreApiHost={sitecoreApiHost}
      sitecoreApiKey={sitecoreApiKey}
      onRedirect={(url) => router.push(url)}
    />
  );

export default withRouter(ContactUs);