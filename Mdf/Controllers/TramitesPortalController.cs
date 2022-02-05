using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;

namespace Mdf.Controllers
{
    public class TramitesPortalController : Controller
    {
        private readonly IConfiguration _config;
        public TramitesPortalController(IConfiguration config)
        {
            _config = config;
        }

        public IActionResult Index()
        {

            return View();
        }

        [HttpGet]
        [Route("TramitesPortal/TramitesOpciones/{IDPERSONA}/{IDTRAMITE}")]
        public IActionResult TramitesOpciones(int IdPersona, int IdTramite)
        {
            ViewData["IDPERSONA"] = IdPersona;
            ViewData["IDTRAMITE"] = IdTramite;
            return View("TramitesOpciones");

        }
        [HttpGet]
        [Route("TramitesPortal/RegistroSolicitudTramites/{IDPERSONA}/{IDTRAMITE}/{IDTRAMITEOPCION}/{IDSOLICITUDTRAMITE}")]
        public IActionResult RegistroSolicitudTramites(int IdPersona, int IdTramite, int idTramiteOpcion, int IdSolicitudTramite)
        {
            ViewData["IDPERSONA"] = IdPersona;
            ViewData["IDTRAMITE"] = IdTramite;
            ViewData["IDTRAMITEOPCION"] = idTramiteOpcion;
            ViewData["IDSOLICITUDTRAMITE"] = IdSolicitudTramite;
            return View("RegistroSolicitudTramites");

        }

        [HttpPost]
        [Route("TramitesPortal/inicio")]
        public IActionResult TramitesPortal([FromBody] Dictionary<string, object> value)
        {
            ViewData["IDPERSONA"] = value["IdPersona"];
            ViewData["IDTRAMITE"] = value["IdTramite"];
            ViewData["IDSOLICITUDTRAMITE"] = value["IdSolicitudTramite"];
            return View("Index");

        }




        [DataContract]
        public class ChunkMetaData
        {
            [DataMember(Name = "uploadUid")]
            public string UploadUid { get; set; }
            [DataMember(Name = "fileName")]
            public string FileName { get; set; }
            [DataMember(Name = "contentType")]
            public string ContentType { get; set; }
            [DataMember(Name = "chunkIndex")]
            public long ChunkIndex { get; set; }
            [DataMember(Name = "totalChunks")]
            public long TotalChunks { get; set; }
            [DataMember(Name = "totalFileSize")]
            public long TotalFileSize { get; set; }
        }

        public class FileResult
        {
            public bool uploaded { get; set; }
            public string fileUid { get; set; }
        }

        [HttpPost]
        public ActionResult Submit(IEnumerable<HttpPostedFileBase> files)
        {
            if (files != null)
            {
                TempData["UploadedFiles"] = GetFileInfo(files);
            }

            return RedirectToRoute("Demo", new { section = "upload", example = "result" });
        }

        public ActionResult Save(string NombreTramite, string NombreTipoTramite, int idpersona, int NoRegtramite, string NombreArchSugerido, List<IFormFile> files)
        {
            string raiz= _config.GetValue<string>("RutaSrv:Path");
            string ruta="";
            string NuevoNombre = "";
            Dictionary<string, object> respuesta = new Dictionary<string, object>();
            try
            {
                
                if (files != null)
                {
                    foreach (var file in files)
                    {
                        char Pad = '0';
                        
                        var fileName = Path.GetFileName(file.FileName);

                        var physicalPath = Path.Combine(raiz, NombreTramite.ToString(), NombreTipoTramite.ToString(), idpersona.ToString().PadLeft(9, Pad), NoRegtramite.ToString().PadLeft(9, Pad));
                        var physicalPathDestino = Path.Combine(raiz, NombreTramite.ToString(), NombreTipoTramite.ToString(), idpersona.ToString().PadLeft(9, Pad), NoRegtramite.ToString().PadLeft(9, Pad));

                        if (!Directory.Exists(physicalPath))
                            Directory.CreateDirectory(physicalPath);

                        physicalPath = Path.Combine(physicalPath, fileName);
                        NuevoNombre = NombreArchSugerido + Path.GetExtension(file.FileName);
                        physicalPathDestino = Path.Combine(physicalPathDestino, NuevoNombre);

                        using (Stream fileStream = new FileStream(physicalPath, FileMode.CreateNew, FileAccess.Write))
                        {
                            file.CopyTo(fileStream);
                            System.IO.File.Copy(physicalPath, physicalPathDestino, true);
                          
                        }

                        System.IO.File.Delete(physicalPath);
                        ruta = physicalPath;
                    }
                }

                respuesta.Add("Resultado", true);
                respuesta.Add("ruta", ruta);
                respuesta.Add("NombreArchivo", NuevoNombre);
                return Json(respuesta);
            }
            catch (Exception)
            {

                respuesta.Add("Resultado", false);
                respuesta.Add("ruta", "");
                respuesta.Add("NombreArchivo", "");
                return Json(respuesta);
            }

           

            // Return an empty string to signify success
         
        }

        public ActionResult Remove(string[] fileNames)
        {
            // The parameter of the Remove action must be called "fileNames"

            if (fileNames != null)
            {
                foreach (var fullName in fileNames)
                {
                    var fileName = Path.GetFileName(fullName);
                    var physicalPath = Path.Combine("C:/Trimites", fileName);

                    // TODO: Verify user permissions

                    if (System.IO.File.Exists(physicalPath))
                    {
                        // The files are not actually removed in this demo
                        System.IO.File.Delete(physicalPath);
                    }
                }
            }

            // Return an empty string to signify success
            return Content("");
        }

        public void AppendToFile(string fullPath, Stream content)
        {
            try
            {
                using (FileStream stream = new FileStream(fullPath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite))
                {
                    using (content)
                    {
                        content.CopyTo(stream);
                    }
                }
            }
            catch (IOException ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        [Route("TramitesPortal/ChunkSave/{NombreTramite}/{NombreTipoTramite}/{idpersona}/{NoRegtramite}/{NombreArchSugerido}")]
        public ActionResult ChunkSave(string NombreTramite, string NombreTipoTramite, int idpersona, int NoRegtramite, string NombreArchSugerido, List<IFormFile> files, string metaData)
        {
            if (metaData == null)
            {
                return Save(NombreTramite, NombreTipoTramite, idpersona, NoRegtramite, NombreArchSugerido,files);
            }

            MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(metaData));
            var serializer = new DataContractJsonSerializer(typeof(ChunkMetaData));
            ChunkMetaData somemetaData = serializer.ReadObject(ms) as ChunkMetaData;
            string path = String.Empty;
            // The Name of the Upload component is "files"
            if (files != null)
            {
                foreach (var file in files)
                {
                    //path = Path.Combine(Server.MapPath("~/App_Data"), somemetaData.FileName);

                    //AppendToFile(path, file.InputStream);
                }
            }

            FileResult fileBlob = new FileResult();
            fileBlob.uploaded = somemetaData.TotalChunks - 1 <= somemetaData.ChunkIndex;
            fileBlob.fileUid = somemetaData.UploadUid;

            return Json(fileBlob);
        }

        private IEnumerable<string> GetFileInfo(IEnumerable<HttpPostedFileBase> files)
        {
            return
                from a in files
                where a != null
                select string.Format("{0} ({1} bytes)", Path.GetFileName(""), "");
        }


    }

}
