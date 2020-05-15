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
                    Link = GetLinkFromURL(url)
                };
            }
            else
            {
                return AddURL(url);
            }
        }

        public string GetLinkFromURL(string url)
        {
            return _linkBundles[url].Link;
        }

        public string GetURLFromLink(string link)
        {
            return _linkBundles.FirstOrDefault(l => l.Value.Link == link).Key;
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
                FullURL = url,
                Link = string.Format("{0:X}", url.GetHashCode())
            };
            _linkBundles.Add(newLinkBundle.FullURL, newLinkBundle);

            return newLinkBundle;
        }
    } 
}
