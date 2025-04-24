<?php
namespace App\Services;

use App\Repositories\Interfaces\ActivityInterface;

class ActivityService {

    public function __construct(private ActivityInterface $activityRepository){}

    public function save(string $action){
        $ip = (isset($_SERVER['REMOTE_ADDR'])) ? $_SERVER['REMOTE_ADDR'] : '' ;
        $agent = (isset($_SERVER['HTTP_USER_AGENT'])) ? $_SERVER['HTTP_USER_AGENT'] : '';
        
        // Detect Device/Operating System
        if(preg_match('/Linux/i',$agent)) $os = 'Linux';
        elseif(preg_match('/Mac/i',$agent)) $os = 'Mac';
        elseif(preg_match('/iPhone/i',$agent)) $os = 'iPhone';
        elseif(preg_match('/iPad/i',$agent)) $os = 'iPad';
        elseif(preg_match('/Droid/i',$agent)) $os = 'Droid';
        elseif(preg_match('/Unix/i',$agent)) $os = 'Unix';
        elseif(preg_match('/Windows/i',$agent)) $os = 'Windows';
        else $os = 'Unknown';

        // Browser Detection
        if(preg_match('/Firefox/i',$agent)) $br = 'Firefox';
        elseif(preg_match('/Mac/i',$agent)) $br = 'Mac';
        elseif(preg_match('/Chrome/i',$agent)) $br = 'Chrome';
        elseif(preg_match('/Opera/i',$agent)) $br = 'Opera';
        elseif(preg_match('/MSIE/i',$agent)) $br = 'IE';
        else $br = 'Unknown';

        setlocale(LC_TIME, 'fr_FR.utf8','fra');

        $this->activityRepository->save([
            'user_id' => auth('web')->user()->id,
            'ip' => $ip,
            'navigator' => $br.' '.$os,
            'action' => $action,
            'country' => (isset($_SERVER['GEOIP_COUNTRY_NAME'])) ? $_SERVER['GEOIP_COUNTRY_NAME'] : '',
            'country_code' => (isset($_SERVER['GEOIP_COUNTRY_CODE'])) ? $_SERVER['GEOIP_COUNTRY_CODE'] : '',
            'url' => url()->current(),
        ]);
    }
}