using LinkShortener.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public LinkBundles SubmitURL(string url)
        {
            // If Submitted URL doesn't already exist, add to dictionary
            var currentLinks = GetLinks();
            if (currentLinks.ContainsKey(url))
            {
                return new LinkBundles
                {
                    FullURL = url,
                    ShortURL = GetShortURL(url)
                };
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

        private Dictionary<string, LinkBundles> GetLinks()
        {
            return _linkBundles;
        }

        private LinkBundles AddURL(string url)
        {
            // Create a new LinkBundles Object with the Link as HashCode for the URL
            // Not a good solution due to GetHashCode being platform dependent -> will look for alternative
            LinkBundles newLinkBundle = new LinkBundles
            {
                Id = Guid.NewGuid(),
                FullURL = url,
                ShortURL = "https://localhost:5001/api/Link/" + string.Format("{0:X}", url.GetHashCode()),
                CreatedAt = DateTime.Now
        };
            _linkBundles.Add(newLinkBundle.FullURL, newLinkBundle);

            return newLinkBundle;
        }
    } 
}
