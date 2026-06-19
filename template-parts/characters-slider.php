<?php
// 1. Configuration de la requête pour récupérer tes personnages (Custom Post Type 'characters')
$args = array(
    'post_type'      => 'characters',
    'posts_per_page' => -1, // -1 permet de récupérer TOUS les personnages
    'orderby'        => 'title',
    'order'          => 'ASC',
);

$characters_query = new WP_Query($args);
?>

<?php if ( $characters_query->have_posts() ) : ?>
    <div class="swiper">
        <div class="swiper-wrapper">
            
            <?php while ( $characters_query->have_posts() ) : $characters_query->the_post(); ?>
                <div class="swiper-slide">
                    <figure>
                        <?php if ( has_post_thumbnail() ) : ?>
                            <?php the_post_thumbnail('full'); ?>
                        <?php endif; ?>
                        
                        <figcaption><?php the_title(); ?></figcaption>
                    </figure>
                </div>
            <?php endwhile; ?>

        </div>
        
        
    </div>
<?php 
    // 3. IMPORTANT : Réinitialise la requête globale de WordPress pour ne pas casser le reste de la page
    wp_reset_postdata(); 
endif; 
?>