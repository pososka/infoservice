@extends('layout.main')

@section('title', 'Laravel - Feedback')

@section('content')
<div class="container">
    <h1 class="mb-5 text-center">Create Feedback</h1>

    <div class="row justify-content-center">
        <div class="col-md-6">
            @if (session('status.success'))
                <div class="alert alert-success">{{ session('status.success') }}</div>
            @endif
                
            @if (session('status.error'))
                <div class="alert alert-danger">{{ session('status.error') }}</div>
            @endif

            <form method="POST" action="{{ route('feedback.store') }}" enctype="multipart/form-data">
                @csrf

                <div class="form-group mb-3">
                    <label class="form-label" for="name">{{ __('feedback.name') }}</label>
                    <input class="form-control @error('name')is-invalid @enderror" type="text" name="name" id="name" />

                    @error('name')
                        <div class="invalid-feedback">{{ $message }}</div>                  
                    @enderror
                </div>

                <div class="form-group mb-3">
                    <label class="form-label" for="name">{{ __('feedback.phone') }}</label>
                    <input class="form-control @error('phone')is-invalid @enderror" type="text" name="phone" id="phone" />

                    @error('phone')
                        <div class="invalid-feedback">{{ $message }}</div>                  
                    @enderror
                </div>

                <div class="form-group mb-3">
                    <label class="form-label" for="name">{{ __('feedback.company') }}</label>
                    <input class="form-control @error('company')is-invalid @enderror" type="text" name="company" id="company" />

                    @error('company')
                        <div class="invalid-feedback">{{ $message }}</div>                  
                    @enderror
                </div>

                <div class="form-group mb-3">
                    <label class="form-label" for="name">{{ __('feedback.title') }}</label>
                    <input class="form-control @error('title')is-invalid @enderror" type="text" name="title" id="title" />

                    @error('title')
                        <div class="invalid-feedback">{{ $message }}</div>                  
                    @enderror
                </div>

                <div class="form-group mb-3">
                    <label class="form-label" for="name">{{ __('feedback.message') }}</label>
                    <textarea class="form-control @error('message')is-invalid @enderror" name="message" id="message"rows="5"></textarea>

                    @error('message')
                        <div class="invalid-feedback">{{ $message }}</div>                  
                    @enderror
                </div>

                <div class="form-group mb-3">
                    <label class="form-label" for="name">{{ __('feedback.file') }}</label>
                    <input class="form-control @error('file')is-invalid @enderror" type="file" name="file" id="file" />

                    @error('file')
                        <div class="invalid-feedback">{{ $message }}</div>                  
                    @enderror
                </div>
                
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">{{ __('feedback.send') }}</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
