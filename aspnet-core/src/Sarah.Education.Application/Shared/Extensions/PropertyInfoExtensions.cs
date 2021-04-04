using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace Sarah.Education.Shared.Extensions
{
    public static class PropertyInfoExtensions
    {
        public static TValue GetAttributValue<TAttribute, TValue>(this PropertyInfo prop, Func<TAttribute, TValue> value) where TAttribute : Attribute
        {
            var att = prop.GetCustomAttributes(typeof(TAttribute), true).FirstOrDefault() as TAttribute;
            if (att != null)
            {
                return value(att);
            }
            return default(TValue);
        }

        public static string GetDisplayValue(this PropertyInfo property, object obj)
        {
            var objValue = property.GetValue(obj);
            if (objValue != null)
            {
                var att = (DisplayFormatAttribute)property.GetCustomAttributes(typeof(DisplayFormatAttribute), true).FirstOrDefault();
                if (att != null)
                {
                    return string.Format(att.DataFormatString, property.GetValue(obj));
                }

                return property.GetValue(obj).ToString();
            }

            return string.Empty;
        }
    }
}
