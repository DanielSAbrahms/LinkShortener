using LinkShortener.API.Models;
using LinkShortener.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LinkShortener.API.Controllers
{
    [Route("l")]
    [ApiController]
    [Authorize]
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

        /*
         * This controller handles any local url that isn't /AddLink
         * It uses a 301 Permenant redirect to tell the browser where to go
         */
        [HttpGet]
        [Route("{id?}")]
        public ActionResult RedirectFromLink(string id)
        {
            if (id != null)
            {
                var url = _services.GetBundleById(id).FullURL;
                if (url != null)
                {
                    return RedirectPermanent(url.AbsoluteUri);
                }
            }            
            return new EmptyResult();
        }
    }
}