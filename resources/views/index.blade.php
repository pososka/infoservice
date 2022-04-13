<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ mix('assets/css/app.css') }}">

    <title>{{ config('app.name') }}</title>
</head>
<body>
    <div id="app"></div>
    
    <script src="{{ mix('assets/js/app.js') }}"></script>
</body>
</html>
