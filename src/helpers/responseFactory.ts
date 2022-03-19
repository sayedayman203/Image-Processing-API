export interface JsendResponse {
  status: 'success' | 'fail' | 'error';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  message?: string;
}
export const createResponse = (
  status: 'success' | 'fail' | 'error',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any = {},
  message?: string
): JsendResponse => {
  const res: JsendResponse = {
    status,
  };

  switch (status) {
    case 'error': {
      if (!message) {
        res.message = data;
      } else {
        res.data = data;
        res.message = message;
      }
      break;
    }
    case 'success':
    case 'fail': {
      res.data = data;
      break;
    }
  }
  return res;
};
