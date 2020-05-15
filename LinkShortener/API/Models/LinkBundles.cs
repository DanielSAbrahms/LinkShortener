using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LinkShortener.API.Models
{
    public class LinkBundles
    {
        public string FullURL { get; set; }
        public string? Link { get; set; }
    }
}
