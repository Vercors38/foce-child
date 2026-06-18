<?php
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/assets/css/main.css', array( 'parent-style' ) );
    

// CODE À RAJOUTER : Chargement de ton fichier JavaScript
    wp_enqueue_script(
        'child-script', // Identifiant unique du script
        get_stylesheet_directory_uri() . '/assets/js/script.js', // Chemin vers ton fichier JS
        array(), // Dépendances (ex: array('jquery') si tu utilises jQuery, sinon vide)
        '1.0.0', // Version du script
        true // Charge le script dans le footer (recommandé pour les performances)
    );
}

// Get customizer options form parent theme
if ( get_stylesheet() !== get_template() ) {
    add_filter( 'pre_update_option_theme_mods_' . get_stylesheet(), function ( $value, $old_value ) {
        update_option( 'theme_mods_' . get_template(), $value );
        return $old_value; // prevent update to child theme mods
    }, 10, 2 );
    add_filter( 'pre_option_theme_mods_' . get_stylesheet(), function ( $default ) {
        return get_option( 'theme_mods_' . get_template(), $default );
    } );
}