<?php

use Illuminate\Http\UploadedFile;

if (!function_exists('storeFile')){
    function storeFile(string $fileName, string $folder, UploadedFile $file){
        $newFileName = \Str::random(5)."-{$fileName}-".time().'.'.$file->getClientOriginalExtension();
        $path = $file->storeAs("{$folder}", $newFileName, 'public');
        return $path;
    }
}