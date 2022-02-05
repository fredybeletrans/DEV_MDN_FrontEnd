using AspNetCore.ReCaptcha;
using Mdf.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Mdf.Utils.Utils;
namespace Mdf.Controllers
{
    public class LoginUsuariosController : Controller
    {
        private readonly IConfiguration _config;
        private ILogger _logger;

        public LoginUsuariosController(IConfiguration config)
        {
            _config = config;
        }
        public IActionResult Index()
        {
            ViewData["ReCaptchaKey"] = _config.GetValue<string>(
                "ReCaptcha:SiteKey");
            return View();
        }
       
        //[ValidateReCaptcha]
        [HttpPost]
        public IActionResult SubmitForm([FromBody]Dictionary<string, object> value)
        {
            // get reCAPTHCA key from appsettings.json
            ViewData["ReCaptchaKey"] = _config.GetValue<string>(
                "ReCaptcha:SiteKey");
            string token = value["Token"].ToString();


            if (!ReCaptchaPassed(token, _config.GetValue<string>("ReCaptcha:SecretKey"), _logger))
            {
                ModelState.AddModelError(string.Empty, "You failed the CAPTCHA, stupid robot. Go play some 1x1 on SFs instead.");
                return View(value);
            }

            // do your stuff with the model
            // ...

            return View(value);


        }

        [HttpPost]
        public JsonResult ValidaCaptcha([FromBody]Dictionary<string, object> value)
        {
            // get reCAPTHCA key from appsettings.json
            ViewData["ReCaptchaKey"] = _config.GetValue<string>(
                "ReCaptcha:SiteKey");

            string token = value["Token"].ToString();
            string valido = "true";
            string msg = "";

            if (!ReCaptchaPassed(token, _config.GetValue<string>("ReCaptcha:SecretKey"), _logger))
            {
                ModelState.AddModelError(string.Empty, "Fallaste en el CAPTCHA, tu eres un robot");
                valido = "false";
                msg = "Fallaste en el CAPTCHA, tu eres un robot";
            }

            Dictionary<string, string> respuesta = new Dictionary<string, string>()
            {
                {"Validacion", valido},
                {"Mensaje",msg }

            };
        

            return Json(respuesta);
        }
        [HttpGet]
        [Route("LoginUsuarios/VerificarMail/{token}")]
        public IActionResult VerificarMail(string token)
        {
            ViewData["TOKEN"] = token;
            return View("VerificarMail");

        }

    }
}
