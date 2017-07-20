import axios from 'axios';

const RepoService = {
  url: '',
  options: {
    params: {
      format: 'json',
    },
  },
  richExtensionRegExp: /md/,

  buildParams(url = this.url) {
    // shallow clone object without reference
    const params = Object.assign({}, this.options.params);

    if (this.urlIsRichBlob(url)) params.viewer = 'rich';

    return params;
  },

  urlIsRichBlob(url = this.url) {
    const extension = url.split('.').pop();

    return this.richExtensionRegExp.test(extension);
  },

  getContent(url = this.url) {
    const params = this.buildParams(url);

    return axios.get(url, {
      params,
    });
  },

  getBase64Content(url = this.url) {
    const request = axios.get(url, {
      responseType: 'arraybuffer',
    });

    return request.then(response => this.bufferToBase64(response.data));
  },

  bufferToBase64(data) {
    return new Buffer(data, 'binary').toString('base64');
  },

  blobURLtoParentTree(url) {
    const urlArray = url.split('/');
    urlArray.pop();
    const blobIndex = urlArray.indexOf('blob');

    if (blobIndex > -1) urlArray[blobIndex] = 'tree';

    return urlArray.join('/');
  },
};

export default RepoService;
