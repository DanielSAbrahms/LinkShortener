using LinkShortener.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;

namespace LinkShortener.API.Services
{ 
    public class LinkServices: ILinkServices
    {
        private readonly Dictionary<string, LinkBundles> _linkBundles;

        public LinkServices()
        {
            _linkBundles = new Dictionary<string, LinkBundles>();
        }

        // uri class **
        public LinkBundles SubmitURL(string url)
        {
            // Use uri class for validation of url, etc.
            // If Submitted URL doesn't already exist, add to dictionary
            if (_linkBundles.ContainsKey(url))
            {
                return _linkBundles[url];
            }
            else
            {
                return AddURL(url);
            }
        }

        public string GetShortURL(string url)
        {
            return _linkBundles[url].ShortURL;
        }

        public string GetFullURL(string id)
        {
            return _linkBundles.FirstOrDefault(bundle => bundle.Value.ShortURL.EndsWith(id)).Key;
        }

        private LinkBundles AddURL(string url)
        {
            // Uses a GUID to store instance Id and provide the unique Id for short url
            Guid guid = Guid.NewGuid();
            LinkBundles newLinkBundle = new LinkBundles
            {
                Id = guid,
                FullURL = url,
                ShortURL = "https://localhost:5001/" + guid.ToString().Substring(0, 8),
                CreatedAt = DateTime.Now
        };
            _linkBundles.Add(newLinkBundle.FullURL, newLinkBundle);

            return newLinkBundle;
        }
    } 
}
