using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mdf.Controllers
{
    public class AprobacionDocumentosController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
