<?php

namespace App\Services;

use Cloudinary\Cloudinary;

class CloudinaryService
{

    protected $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary(config('cloudinary.cloud_url'));
    }

    /**
     * Uplodad file to Cloudinary
     *
     * @param $file
     * @return void
     */
    public function upload($file, $folder)
    {
        $response = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
            'folder' => $folder,
        ]);

        return $response['secure_url'] ?? null;
    }

    /**
     * Delete file from Cloudinary
     *
     * @param $publicId
     * @return void
     */
    public function delete($publicId)
    {
        try {
            return $this->cloudinary->uploadApi()->destroy($publicId);
        } catch (\Throwable $th) {
            logger()->error("Suppression d'une image cloudinary : " . $th->getMessage());
        }
    }

    /**
     * Get Cloudinary image public id from url
     *
     * @param string $url
     * @return void
     */
    public function extractPublicId($url)
    {
        preg_match('/\/upload\/(?:v\d+\/)?([^\.]+)/', $url, $matches);
        return $matches[1] ?? null;
    }
}
