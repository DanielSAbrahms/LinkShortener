using LinkShortener.API.Models;
using System;

namespace LinkShortener.API.Services
{
    public interface ILinkServices
    {
        public LinkBundles SubmitURL(Uri url);
        public LinkBundles UpdatePath(Uri fullURL, string newPath);
        public LinkBundles GetBundleById(string id);
        public LinkBundles GetBundleByPath(string path);
    }
}
