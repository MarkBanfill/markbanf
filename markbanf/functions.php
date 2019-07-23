<?php
/**
 * markbanf functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package markbanf
 */

if ( ! function_exists( 'markbanf_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function markbanf_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on markbanf, use a find and replace
	 * to change 'markbanf' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'markbanf', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'menu-1' => esc_html__( 'Primary', 'markbanf' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'markbanf_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support( 'custom-logo', array(
		'height'      => 250,
		'width'       => 250,
		'flex-width'  => true,
		'flex-height' => true,
	) );
}
endif;
add_action( 'after_setup_theme', 'markbanf_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function markbanf_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'markbanf_content_width', 640 );
}
add_action( 'after_setup_theme', 'markbanf_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function markbanf_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'markbanf' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'markbanf' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'markbanf_widgets_init' );


/**
 * Enqueue scripts and styles.
 */
function markbanf_scripts() {
	wp_enqueue_style( 'markbanf-style', get_stylesheet_uri() );
	
	wp_enqueue_style( 'markbanf-animate', get_template_directory_uri() . '/css/animate.css' );
	
	wp_enqueue_style( 'markbanf-font-awesome', get_template_directory_uri() . '/css/font-awesome.min.css' );
	
    wp_enqueue_script( 'markbanf-flurry', get_template_directory_uri() . '/js/jquery.flurry.min.js', array('jquery'), false, false );
    
	wp_enqueue_script( 'markbanf-navigation', get_template_directory_uri() . '/js/navigation.js', array(), false, true );

	wp_enqueue_script( 'markbanf-responsive-slides', get_template_directory_uri() . '/js/responsiveslides.min.js', array(), false, true );

	wp_enqueue_script( 'markbanf-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), false, true );
	
    wp_enqueue_script( 'markbanf-script', get_template_directory_uri() . '/js/script.js', array(), false, true );
    
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'markbanf_scripts' );

// Disable REST API link tag
remove_action('wp_head', 'rest_output_link_wp_head', 10);

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Additional features to allow styling of the templates.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';



/**
 * Fix unable to upload SVG bug.
 */
add_filter('upload_mimes','add_custom_mime_types');
    function add_custom_mime_types($mimes){
        return array_merge($mimes,array (
            'ac3' => 'audio/ac3',
            'mpa' => 'audio/MPA',
            'flv' => 'video/x-flv',
            'svg' => 'image/svg+xml'
        ));
    }

/**
 * Disable annoying wpautop function.
 */
remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );

/**
 * Add shortcodes.
 */
function current_year() { return date('Y'); }
add_shortcode('thisyear', 'current_year');
