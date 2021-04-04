using System;
using System.Collections.Generic;
using System.Text;

namespace Sarah.Education.Shared.Dto
{
    public class DataExportInput<THeader, TItem, TFooter> 
        where THeader : class 
        where TItem : class
        where TFooter: class
    {
        public THeader Header { get; set; }
        public List<TItem> Items { get; set; }
        public TFooter Footer { get; set; }
    }
}
