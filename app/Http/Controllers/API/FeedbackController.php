<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $feedbacks = $request->user()->feedbacks;

        foreach ($feedbacks as $feedback) {
            if ($feedback->file) {
                $feedback->fill([
                    'file' => Storage::url($feedback->file),
                ]);
            }
        }

        return response()->json([
            'success'   => true,
            'feedbacks' => $feedbacks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'name'    => 'required|max:255',
            'phone'   => 'required|max:12|min:12',
            'company' => 'required|max:255',
            'title'   => 'required|max:255',
            'message' => 'required|max:255',
            'file'    => 'nullable|file|max:2048|mimes:pdf,png,jpeg,gif,txt'
        ]);


        if ($validated->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validated->errors()->messages(),
            ])->setStatusCode(422);
        }

        $path = null;
        
        if ($request->file('file')) {
            $path = $request->file('file')->store('public');
        }

        $feedback = new Feedback([
            'user_id' => $request->user()->id,
            'name'    => $request->name,
            'phone'   => $request->phone,
            'company' => $request->company,
            'title'   => $request->title,
            'message' => $request->message,
            'file'    => $path,
        ]);
        
        if ($feedback->save()) {
            return response()->json([
                'success'   => true,
                'message' => 'Feedback successfully send',
            ]);
        }
        
        return response()->json([
            'success'   => false,
            'message' => 'Error occured when feedback send',
        ]);
    }
}
