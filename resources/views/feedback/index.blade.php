@extends('layout.main')

@section('title', 'Laravel - Feedback')

@section('content')
<div class="container">
    <h1 class="mb-5 text-center">All Feedback</h1>

    <div class="overflow-auto">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>{{ __('feedback.name') }}</th>
                    <th>{{ __('feedback.phone') }}</th>
                    <th>{{ __('feedback.company') }}</th>
                    <th>{{ __('feedback.title') }}</th>
                    <th>{{ __('feedback.message') }}</th>
                    <th>{{ __('feedback.file') }}</th>
                </tr>
            </thead>

            <tbody>
                @foreach ($feedbacks as $feedback)
                    <tr>
                        <td>{{ $feedback->name }}</td>
                        <td>{{ $feedback->phone }}</td>
                        <td>{{ $feedback->company }}</td>
                        <td>{{ $feedback->title }}</td>
                        <td>{{ $feedback->message }}</td>
                        <td>
                            @if ($feedback->file)
                                <a href="{{ $feedback->file }}" download="download">Download</a>
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    {{-- <div class="d-flex flex-wrap">
        @foreach ($feedbacks as $feedback)
            <div class="card rounded-0 w-25">
                <div class="card-body">
                    <p>{{ $feedback->name }}</p>
                    <p>{{ $feedback->phone }}</p>
                    <p>{{ $feedback->company }}</p>
                    <p>{{ $feedback->title }}</p>
                    <p>{{ $feedback->message }}</p>
                    <p>{{ $feedback->file }}</p>
                </div>
            </div>
        @endforeach
    </div> --}}
</div>
@endsection
