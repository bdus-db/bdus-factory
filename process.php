<?php

require_once 'bdus-cli/libs/Validate.php';
require_once 'bdus-cli/libs/Create.php';


function deleteOldZips()
{
    $fileSystemIterator = new FilesystemIterator('tmp');
    $now = time();
    foreach ($fileSystemIterator as $file) {
        if (
            $file->getExtension() === 'zip' &&
            $now - $file->getCTime() >= 60 * 60 * 24 * 2
            ) { 
            unlink('tmp/' . $file->getFilename());
        }
    }
}

function rrmdir($dir)
{
    if (is_dir($dir)) {
        $objects = scandir($dir);
        foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
                if (is_dir($dir. DIRECTORY_SEPARATOR .$object) && !is_link($dir."/".$object)) {
                    rrmdir($dir. DIRECTORY_SEPARATOR .$object);
                } else {
                    unlink($dir. DIRECTORY_SEPARATOR .$object);
                }
            }
        }
        rmdir($dir);
    }
}
  
  function create_tmp_dir()
  {
      if (!is_dir("./tmp")) {
          mkdir("./tmp");
      }
      if (!is_dir("./tmp")) {
          throw new Exception("Cannot create direcory tmpf");
      }
      $uniq = './tmp/' . uniqid('d');
      if (is_dir($uniq)) {
          create_tmp_dir();
      } else {
          mkdir($uniq);
          mkdir($uniq . '-dest');
          if (is_dir($uniq) && is_dir($uniq . '-dest')) {
              return $uniq;
          } else {
              throw new Exception("Cannot create direcory $uniq");
          }
      }
  }

// https://stackoverflow.com/a/1334949/586449
function ZipDir($source, $destination)
{
    if (!extension_loaded('zip') || !file_exists($source)) {
        return false;
    }

    $zip = new ZipArchive();
    if (!$zip->open($destination, ZIPARCHIVE::CREATE)) {
        return false;
    }

    $source = str_replace('\\', '/', realpath($source));

    if (is_dir($source) === true) {
        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::SELF_FIRST);

        foreach ($files as $file) {
            $file = str_replace('\\', '/', $file);

            // Ignore "." and ".." folders
            if (in_array(substr($file, strrpos($file, '/')+1), array('.', '..'))) {
                continue;
            }

            $file = realpath($file);

            if (is_dir($file) === true) {
                $zip->addEmptyDir(str_replace($source . '/', '', $file . '/'));
            } elseif (is_file($file) === true) {
                $zip->addFromString(str_replace($source . '/', '', $file), file_get_contents($file));
            }
        }
    } elseif (is_file($source) === true) {
        $zip->addFromString(basename($source), file_get_contents($source));
    }

    return $zip->close();
}

try {
    deleteOldZips();

    $resp = [];
    
    $payload = file_get_contents('php://input');
    if (!$payload) {
        throw new Exception("No payload found");
    }

    $data = json_decode($payload, true);
    if (!is_array($data)) {
        throw new Exception("invalid payload");
    }

    $dir = create_tmp_dir();

    foreach ($data as $file => $content) {
        file_put_contents($dir . '/' . $file . '.json', json_encode($content, JSON_PRETTY_PRINT));
    }

    ob_start();
    \mngProject\Create::all($dir, $dir . '-dest', true);
    $resp['validation'] = nl2br(ob_get_contents());
    ob_end_clean();


    $zip = $dir . '.zip';
    ZipDir($dir . '-dest/' . $data['app_data']['name'], $zip);
    rrmdir($dir);
    rrmdir($dir . '-dest');

    $resp["status"] = "success";
    $resp["zip"] = $zip;

} catch (Throwable $t) {
    $resp["status"] = "error";
    $resp["msg"] = $t->getMessage();
}

echo json_encode($resp);
