using LinkShortener.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LinkShortener.API.Services
{
    public interface ILinkServices
    {
        public LinkBundles SubmitURL(string url);
        public string GetShortURL(string url);
        public string GetFullURL(string link);
    }
}
