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
        public LinkBundles SubmitURL(Uri url)
        {
            // Use uri class for validation of url, etc.
            // If Submitted URL doesn't already exist, add to dictionary
            LinkBundles existingBundle = _linkBundles.Values.FirstOrDefault(bundle => bundle.FullURL == url);
            if (existingBundle != null)
            {
                return existingBundle;
            }
            else
            {
                return AddURL(url);
            }
        }

        public LinkBundles GetBundleById(string id)
        {
            return _linkBundles.FirstOrDefault(bundle => bundle.Key.StartsWith(id)).Value;
        }

        private LinkBundles AddURL(Uri url)
        {
            // Uses a GUID to store instance Id and provide the unique Id for short url
            Guid guid = Guid.NewGuid();
            LinkBundles newLinkBundle = new LinkBundles
            {
                Id = guid,
                FullURL = url,
                ShortURL = new Uri("https://localhost:5001/l/" + guid.ToString().Substring(0, 8)),
                CreatedAt = DateTime.Now
        };
            _linkBundles.Add(newLinkBundle.Id.ToString(), newLinkBundle);

            return newLinkBundle;
        }
    } 
}
