using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LinkShortener.API.Models;
using LinkShortener.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LinkShortener.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        [Route("{hashLink?}")]
        public ActionResult<Dictionary<string, LinkBundles>> RedirectFromLink(string? hashLink)
        {
            var url = _services.GetURLFromLink(hashLink);
            return RedirectPermanent(url);
        }
    }
}