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

        public LinkBundles SubmitURL(String url)
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

        public int GetLinkFromURL(String url)
        {
            return _linkBundles[url].Link;
        }

        private Dictionary<string, LinkBundles> GetLinks()
        {
            return _linkBundles;
        }

        private LinkBundles AddURL(String url)
        {
            // Create a new LinkBundles Object with the Link as HashCode for the URL
            LinkBundles newLinkBundle = new LinkBundles
            {
                FullURL = url,
                Link = url.GetHashCode()
        };
            _linkBundles.Add(newLinkBundle.FullURL, newLinkBundle);

            return newLinkBundle;
        }
    } 
}
