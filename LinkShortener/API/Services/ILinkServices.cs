using LinkShortener.API.Models;
using System;

namespace LinkShortener.API.Services
{
    public interface ILinkServices
    {
        public LinkBundles SubmitURL(Uri url);
        public LinkBundles GetBundleById(string id);
    }
}
