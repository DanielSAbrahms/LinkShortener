using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LinkShortener.API.Models
{
    public class LinkBundles
    {
        public Guid Id { get; set; }
        public string FullURL { get; set; }
        public string ShortURL { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
