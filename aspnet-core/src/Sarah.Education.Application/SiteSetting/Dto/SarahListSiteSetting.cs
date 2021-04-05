using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sarah.Education.SiteSetting.Dto
{
    public class SarahListSiteSetting
    {
        public string Name { get; set; }
        public List<SarahSiteSetting> Value { get; set; }
    }
}
