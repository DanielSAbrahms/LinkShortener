using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LinkShortener.API.Models
{
    public class LinkBundles
    {
        public Guid Id { get; set; }
        public Uri FullURL { get; set; }
        public Uri ShortURL { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
