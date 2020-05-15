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

        //[HttpGet]
        //[Route("{hashLink}?")]
        //public ActionResult<Dictionary<string, LinkBundles>> RedirectFromLink()
        //{
        //    var link = _services.GetLinkFromURL();

        //    if (links.Count == 0)
        //    {
        //        return NotFound();
        //    }

        //    return links;
        //}
    }
}