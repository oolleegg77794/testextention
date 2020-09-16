<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDomainListTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('domain_list', function (Blueprint $table) {
            $table->id();

            $table->string('domain');
            $table->unique('domain');
            $table->boolean('thematic');
            $table->integer('status');
            $table->integer('type');
            $table->integer('price');
            $table->integer('url_status');
            $table->boolean('url_thematic');
            $table->string('link');
            $table->integer('link_type');
            $table->integer('referring_domains');
            $table->integer('url_rating');
            $table->integer('organic_search_traffic');
            $table->integer('external_links');
            $table->integer('internal_links');
            $table->integer('trust_flow');
            $table->integer('citation_flow');
            $table->integer('link_position');
            $table->integer('is_https_referral');
            $table->integer('country');
            $table->integer('tech_status');
            $table->text('auth');
            $table->string('auth_link');
            $table->text('comment');
            $table->integer('manager');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('extensions');
    }
}
