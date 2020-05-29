using System;

namespace LinkShortener.API.Models
{
    public class UpdatePathObject
    {
        public string newPath { get; set; }

        public LinkBundles linkBundle { get; set; }
    }
}
