<?php

namespace App\Traits;

use App\Models\Attachment as AttachmentModel;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait Attachment
{
    /**
     * Handle Attachment File Upload
     *
     * @param  Illuminate\Http\UploadedFile  $file
     * @param  string  $uploadPath
     * @param  bool  $originalName
     * @param  string  $fileName
     * @return string $fileLocation path where attachment is saved
     */
    public function handleUpload(UploadedFile $file, $uploadPath, string $categorySlug, $originalName = false, $fileName = null)
    {
        $fileLocation = null;
        $fileInfo = [];

        $extension = $file->extension();
        $fileName = ($originalName) ? pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) : $fileName;

        if (!Storage::exists($uploadPath)) {
            Storage::makeDirectory($uploadPath);
        }

        if (!empty($fileName)) {
            $fileLocation = $file->storeAs(
                $uploadPath,
                $fileName . '.' . $extension
            );
        } else {
            $fileLocation = $file->store($uploadPath);
        }

        $fileInfo['original_file_name'] = $file->getClientOriginalName();
        $fileInfo['file_location'] = $fileLocation;
        $fileInfo['file_format'] = $extension;
        $fileInfo['category_slug'] = $categorySlug;

        return $fileInfo;
    }

    /**
     * Check and Delete Attachment file if exists
     *
     * @param  string  $filePath
     * @return bool
     */
    public function deleteFromStorage($filePath)
    {
        if (empty($filePath)) {
            return;
        }

        if (Storage::exists($filePath)) {
            return Storage::delete($filePath);
        }
    }

    public function insertAttachment($type, $model_id, $file, string $createdById, $uploadPath, $categorySlug = null)
    {
        $fileInfo = $this->handleUpload($file, $uploadPath, $categorySlug, false);
        if (!empty($fileInfo)) {
            AttachmentModel::create([
                'model_type' => $type,
                'model_id' => $model_id,
                'file_name' => $fileInfo['original_file_name'],
                'file_location' => $fileInfo['file_location'],
                'file_type' => $fileInfo['file_format'],
                'category_slug' => $fileInfo['category_slug'],
                'created_by' => $createdById,
            ]);
        }
    }

    public function updateAttachmentByType($type, $model_id, $file, $uploadPath, $fileName = null)
    {
        $modelAttachment = AttachmentModel::ofType($type, $model_id)->first();

        if ($modelAttachment) {

            $this->deleteFromStorage($modelAttachment->file_location);
            $fileInfo = $this->handleUpload($file, $uploadPath, false, $fileName);
            if (!empty($fileInfo)) {
                $modelAttachment->original_file_name = $fileInfo['original_file_name'];
                $modelAttachment->file_location = $fileInfo['file_location'];
                $modelAttachment->file_format = $fileInfo['file_format'];

                return $modelAttachment->save();
            }
        } else {

            $this->insertAttachment($type, $model_id, $file, $uploadPath, $fileName);
        }
    }

    public function updateAttachmentById($type, $model_id, $file, $uploadPath, $fileName = null, $attachment_id = null)
    {
        $modelAttachment = !empty($attachment_id)
            ? AttachmentModel::findOrFail($attachment_id)
            : null;

        if ($modelAttachment) {

            $this->deleteFromStorage($modelAttachment->file_location);
            $fileInfo = $this->handleUpload($file, $uploadPath, false, $fileName);
            if (!empty($fileInfo)) {
                $modelAttachment->original_file_name = $fileInfo['original_file_name'];
                $modelAttachment->file_location = $fileInfo['file_location'];
                $modelAttachment->file_format = $fileInfo['file_format'];

                return $modelAttachment->save();
            }
        } else {

            $this->insertAttachment($type, $model_id, $file, $uploadPath, $fileName);
        }
    }

    public function deleteAttachmentByType($type, $model_id)
    {
        $modelAttachment = AttachmentModel::where('model_type', $type)
            ->where('model_id', $model_id)
            ->first();
        $this->deleteFromStorage($modelAttachment->file_location);

        return $modelAttachment->delete();
    }

    public function deleteAttachmentById($attachmentId)
    {
        if (is_array($attachmentId)) {
            $modelAttachments = AttachmentModel::whereIn('id', $attachmentId)->pluck('file_location');
            foreach ($modelAttachments as $modelAttachment) {
                $this->deleteFromStorage($modelAttachment);
            }

            return AttachmentModel::whereIn('id', $attachmentId)->delete();
        } else {
            $modelAttachment = AttachmentModel::where('id', $attachmentId)->first();
            $this->deleteFromStorage($modelAttachment->file_location);

            return $modelAttachment->delete();
        }
    }

    public function createImageFromBase64($uploadPath, $encodedString)
    {
        $image_parts = explode(';base64,', $encodedString);
        $image_type_aux = explode('image/', $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);

        if (!Storage::exists($uploadPath)) {
            Storage::makeDirectory($uploadPath);
        }
        $fileLocation = $uploadPath . '/' . Str::random(40) . uniqid() . '.' . $image_type;

        Storage::put($fileLocation, $image_base64);

        $fileInfo['file_location'] = $fileLocation;
        $fileInfo['file_format'] = $image_type;

        return $fileInfo;
    }

    public function insertBase64Image($type, $model_id, $encodedString, $uploadPath)
    {
        $fileInfo = $this->createImageFromBase64($uploadPath, $encodedString);

        if (!empty($fileInfo)) {
            return AttachmentModel::create([

                'type' => $type,
                'model_id' => $model_id,
                'file_location' => $fileInfo['file_location'],
                'file_format' => $fileInfo['file_format'],
            ]);
        }
    }

    public function updateBase64ImageById($type, $model_id, $encodedString, $uploadPath, $attachment_id = null)
    {
        $modelAttachment = !empty($attachment_id)
            ? AttachmentModel::findOrFail($attachment_id)
            : null;

        if ($modelAttachment) {

            $this->deleteFromStorage($modelAttachment->file_location);
            $fileInfo = $this->createImageFromBase64($uploadPath, $encodedString);
            if (!empty($fileInfo)) {
                $modelAttachment->file_location = $fileInfo['file_location'];
                $modelAttachment->file_format = $fileInfo['file_format'];

                return $modelAttachment->save();
            }
        } else {
            $this->insertBase64Image($type, $model_id, $encodedString, $uploadPath);
        }
    }

    /**
     * Check string is a valid base64 image
     *
     * @return bool
     */
    public function is_base64image($string)
    {
        $explode = explode(',', $string);
        $allow = ['png', 'jpg', 'jpeg'];
        $format = str_replace(
            [
                'data:image/',
                ';',
                'base64',
            ],
            [
                '', '', '',
            ],
            $explode[0]
        );

        // check file format
        if (!in_array($format, $allow)) {
            return false;
        }

        // check base64 format
        if (!preg_match('%^[a-zA-Z0-9/+]*={0,2}$%', $explode[1])) {
            return false;
        }

        if (!(base64_encode(base64_decode($explode[1], true)) === $explode[1] && imagecreatefromstring(base64_decode($explode[1])))) {
            return false;
        }

        return true;
    }

    /**
     * Create a clone of attachment file
     *
     * @return void
     */
    public function createCloneAttachment($filePath)
    {
        //check if file exists
        if (Storage::exists($filePath)) {

            $fileDetailsArr = explode('/', $filePath);
            $uploadPath = $fileDetailsArr[0];
            $extension = pathinfo($filePath, PATHINFO_EXTENSION);

            $newFileName = $uploadPath . '/' . Str::random(40) . uniqid() . '.' . $extension;
            Storage::copy($filePath, $newFileName);

            $newFileInfo['file_location'] = $newFileName;
            $newFileInfo['file_format'] = $extension;

            return $newFileInfo;
        }
    }
}
