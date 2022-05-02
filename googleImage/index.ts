import cheerio from 'cheerio';
import flatten = require('lodash');
import * as queryString from 'querystring';
import request = require('request');

var baseURL = 'http://images.google.com/search?';

var imageFileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];

export const googleImage = function googleImage(opts: string, done: any) {
  var searchTerm;
  var filterOutDomains = ['gstatic.com'];

  if (typeof opts === 'string') {
    searchTerm = opts;
  }

  let url =
    baseURL +
    queryString.stringify({
      tbm: 'isch',
      q: searchTerm,
    });

  if (filterOutDomains) {
    url += encodeURIComponent(
      ' ' + filterOutDomains.map(addSiteExcludePrefix).join(' '),
    );
  }

  let reqOpts = {
    url: url,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
    },
  };

  // console.log(reqOpts.url);
  request(reqOpts, parseGISResponse);

  function parseGISResponse(error: any, response: any, body: any) {
    if (error) {
      done(error);
      return;
    }
    var $ = cheerio.load(body);
    var scripts: any = $('script');
    var scriptContents = [];
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].children.length > 0) {
        const content = scripts[i].children[0].data;
        if (containsAnyImageFileExtension(content)) {
          scriptContents.push(content);
        }
      }
    }

    done(error, flatten(scriptContents.map(collectImageRefs)));

    function collectImageRefs(content: any) {
      var refs = [];
      var re = /\["(http.+?)",(\d+),(\d+)\]/g;
      var result;
      while ((result = re.exec(content)) !== null) {
        if (result.length > 3) {
          let ref = {
            url: result[1],
            width: +result[3],
            height: +result[2],
          };
          if (domainIsOK(ref.url)) {
            refs.push(ref);
          }
        }
      }
      return refs;
    }

    function domainIsOK(url: any) {
      if (!filterOutDomains) {
        return true;
      } else {
        return filterOutDomains.every(skipDomainIsNotInURL);
      }

      function skipDomainIsNotInURL(skipDomain: any) {
        return url.indexOf(skipDomain) === -1;
      }
    }
  }
};

function addSiteExcludePrefix(s: any) {
  return '-site:' + s;
}

function containsAnyImageFileExtension(s: any) {
  var lowercase = s.toLowerCase();
  return imageFileExtensions.some(containsImageFileExtension);

  function containsImageFileExtension(ext: any) {
    return lowercase.includes(ext);
  }
}
