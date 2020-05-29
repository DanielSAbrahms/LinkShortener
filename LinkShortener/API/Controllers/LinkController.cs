using LinkShortener.API.Models;
using LinkShortener.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace LinkShortener.API.Controllers
{
    [Route("l")]
    [ApiController]
    //[Authorize]
    public class LinkController : ControllerBase
    {
        private readonly ILinkServices _services;

        public LinkController(ILinkServices services)
        {
            _services = services;
        }

        [HttpPost]
        [Route("AddLink")]
        public ActionResult<LinkBundles> AddLink(LinkBundles bundle)
        {
            var linkBundles = _services.SubmitURL(bundle.FullURL);

            if (linkBundles == null)
            {
                return NotFound();
            }
            return linkBundles;
        }

        [HttpPost]
        [Route("UpdatePath")]
        public ActionResult<LinkBundles> UpdatePath(UpdatePathObject data)
        {
            LinkBundles linkBundles = _services.UpdatePath(data.linkBundle.FullURL, data.newPath);

            if (linkBundles == null)
            {
                return NotFound();
            }
            return linkBundles;
        }

        /*
         * This controller handles any local url that isn't /AddLink
         * It uses a 301 Permenant redirect to tell the browser where to go
         */
        [HttpGet]
        [Route("{path?}")]
        public ActionResult RedirectFromLink(string path)
        {
            if (path != null)
            {
                // TODO: Add NullExpceptionHandler
                var url = _services.GetBundleByPath(path).FullURL;
                if (url != null)
                {
                    return RedirectPermanent(url.AbsoluteUri);
                }
            }            
            return new EmptyResult();
        }
    }
}