using LinkShortener.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LinkShortener.API.Services
{
    public interface ILinkServices
    {
        public LinkBundles SubmitURL(Uri url);
        public LinkBundles GetBundleById(string id);
    }
}
