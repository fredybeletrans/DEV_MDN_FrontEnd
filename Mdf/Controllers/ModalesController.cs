using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mdf.Controllers
{
    public class ModalesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public ActionResult CambioEstado()
        {

            return PartialView("_CambioEstado");
        }
    }
}
